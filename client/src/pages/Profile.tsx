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
import { useEffect } from "react";

const profileSchema = z.object({
  biotype: z.enum(["ectomorph", "mesomorph", "endomorph"]),
  objective: z.enum(["hypertrophy", "weight_loss", "maintenance", "strength"]),
  gender: z.enum(["male", "female", "other"]),
  birthDate: z.string().optional(),
  height: z.coerce.number().min(0),
  weight: z.coerce.number().min(0),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
});

export default function Profile() {
  const utils = trpc.useUtils();
  const { data: profile, isLoading } = trpc.profile.get.useQuery();
  const { data: estimate } = trpc.profile.estimateMaxNatural.useQuery(undefined, { enabled: !!profile });
  const mutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated");
      utils.profile.invalidate();
    },
    onError: (err) => {
        toast.error(`Error: ${err.message}`);
    }
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      biotype: "mesomorph",
      objective: "hypertrophy",
      gender: "male",
      height: 170,
      weight: 70,
      activityLevel: "moderate",
    },
  });

  useEffect(() => {
    if (profile) {
        form.reset({
            biotype: profile.biotype as any,
            objective: profile.objective as any,
            gender: profile.gender as any,
            birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : undefined,
            height: profile.height || 0,
            weight: profile.weight || 0,
            activityLevel: profile.activityLevel as any,
        });
    }
  }, [profile, form]);

  function onSubmit(values: z.infer<typeof profileSchema>) {
    mutation.mutate(values);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
          <CardDescription>Update your personal information to get better recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="biotype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biotype</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select biotype" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ectomorph">Ectomorph</SelectItem>
                        <SelectItem value="mesomorph">Mesomorph</SelectItem>
                        <SelectItem value="endomorph">Endomorph</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objective</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select objective" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                        <SelectItem value="weight_loss">Weight Loss</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
               <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Lightly Active</SelectItem>
                        <SelectItem value="moderate">Moderately Active</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="very_active">Very Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Analysis</CardTitle>
              <CardDescription>Based on your stats</CardDescription>
          </CardHeader>
          <CardContent>
              {estimate ? (
                  <div className="space-y-4">
                      <div>
                          <p className="font-semibold">BMI</p>
                          <p className="text-2xl">{estimate.bmi}</p>
                      </div>
                      <div>
                          <p className="font-semibold">Max Natural Potential Estimate</p>
                          {estimate.maxPotentialWeightAt10PercentBF ? (
                             <p className="text-2xl">~{estimate.maxPotentialWeightAt10PercentBF} kg <span className="text-sm font-normal text-muted-foreground">(at 10% body fat)</span></p>
                          ) : (
                              <p>-</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-2">{estimate.message}</p>
                      </div>
                  </div>
              ) : (
                  <p>Please save your profile to view analysis.</p>
              )}
          </CardContent>
      </Card>
      </div>
    </div>
  );
}
