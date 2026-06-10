import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const dietSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  dailyCalories: z.coerce.number().min(0).optional(),
});

export default function Diets() {
  const utils = trpc.useUtils();
  const { data: diets, isLoading } = trpc.diets.list.useQuery();
  const mutation = trpc.diets.create.useMutation({
    onSuccess: () => {
      toast.success("Diet created");
      utils.diets.invalidate();
      form.reset();
    },
    onError: (err) => {
        toast.error(`Error: ${err.message}`);
    }
  });

  const deleteMutation = trpc.diets.delete.useMutation({
      onSuccess: () => {
          toast.success("Diet deleted");
          utils.diets.invalidate();
      },
      onError: (err) => {
        toast.error(`Error: ${err.message}`);
      }
  });

  const form = useForm<z.infer<typeof dietSchema>>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      name: "",
      description: "",
      dailyCalories: 2000,
    },
  });

  function onSubmit(values: z.infer<typeof dietSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Diets</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Diet</CardTitle>
            <CardDescription>Add a new diet plan.</CardDescription>
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
                        <Input placeholder="e.g. Bulk Diet" {...field} />
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
                        <Textarea placeholder="Diet details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="dailyCalories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Calories</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Creating..." : "Create Diet"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Diets</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? (
                 <p>Loading...</p>
             ) : diets?.length === 0 ? (
                 <p className="text-muted-foreground">No diets found.</p>
             ) : (
                 <ul className="space-y-4">
                     {diets?.map((diet) => (
                         <li key={diet.id} className="flex items-center justify-between border p-4 rounded-lg">
                             <div>
                                 <p className="font-semibold">{diet.name}</p>
                                 <p className="text-sm text-muted-foreground">{diet.dailyCalories} kcal</p>
                             </div>
                             <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(diet.id)}>Delete</Button>
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
