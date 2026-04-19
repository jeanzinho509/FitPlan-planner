import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const workoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

export default function Workouts() {
  const utils = trpc.useUtils();
  const { data: workouts, isLoading } = trpc.workouts.list.useQuery();
  const mutation = trpc.workouts.create.useMutation({
    onSuccess: () => {
      toast.success("Workout created");
      utils.workouts.invalidate();
      form.reset();
    },
    onError: (err) => {
        toast.error(`Error: ${err.message}`);
    }
  });

  const deleteMutation = trpc.workouts.delete.useMutation({
      onSuccess: () => {
          toast.success("Workout deleted");
          utils.workouts.invalidate();
      },
      onError: (err) => {
        toast.error(`Error: ${err.message}`);
      }
  });

  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "beginner",
    },
  });

  function onSubmit(values: z.infer<typeof workoutSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workouts</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Workout</CardTitle>
            <CardDescription>Add a new workout plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Upper Body Power" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Workout details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Creating..." : "Create Workout"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Workouts</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? (
                 <p>Loading...</p>
             ) : workouts?.length === 0 ? (
                 <p className="text-muted-foreground">No workouts found.</p>
             ) : (
                 <ul className="space-y-4">
                     {workouts?.map((workout) => (
                         <li key={workout.id} className="flex items-center justify-between border p-4 rounded-lg">
                             <div>
                                 <p className="font-semibold">{workout.name}</p>
                                 <p className="text-sm text-muted-foreground">{workout.difficulty}</p>
                             </div>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button variant="destructive" size="sm">Delete</Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     This action cannot be undone. This will permanently delete your workout
                                     "{workout.name}".
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction
                                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                     onClick={() => deleteMutation.mutate(workout.id)}
                                   >
                                     Delete
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                         </li>
                     ))}
                 </ul>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
