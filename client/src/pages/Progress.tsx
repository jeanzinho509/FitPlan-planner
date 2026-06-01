import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";

const progressSchema = z.object({
  date: z.string(),
  weight: z.coerce.number().min(0).optional(),
  bodyFat: z.coerce.number().min(0).optional(),
  chest: z.coerce.number().min(0).optional(),
  waist: z.coerce.number().min(0).optional(),
  hips: z.coerce.number().min(0).optional(),
  arms: z.coerce.number().min(0).optional(),
  legs: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export default function Progress() {
  const utils = trpc.useUtils();
  const { data: logs, isLoading } = trpc.progress.list.useQuery();
  const mutation = trpc.progress.log.useMutation({
    onSuccess: () => {
      toast.success("Progress logged");
      utils.progress.invalidate();
      form.reset();
    },
    onError: err => {
      toast.error(`Error: ${err.message}`);
    },
  });

  const deleteMutation = trpc.progress.delete.useMutation({
    onSuccess: () => {
      toast.success("Log deleted");
      utils.progress.invalidate();
    },
    onError: err => {
      toast.error(`Error: ${err.message}`);
    },
  });

  const form = useForm<z.infer<typeof progressSchema>>({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      weight: 0,
      bodyFat: 0,
    },
  });

  function onSubmit(values: z.infer<typeof progressSchema>) {
    mutation.mutate(values);
  }

  const chartData = logs
    ? logs
        .slice()
        .reverse()
        .map(log => ({
          ...log,
          dateFormatted: format(new Date(log.date), "MM/dd"),
        }))
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Progress</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log Progress</CardTitle>
            <CardDescription>Record your measurements.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
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
                  <FormField
                    control={form.control}
                    name="bodyFat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Fat (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Add more fields as needed */}
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Logging..." : "Log Progress"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : logs?.length === 0 ? (
              <p className="text-muted-foreground">No logs found.</p>
            ) : (
              <ul className="space-y-4 max-h-[300px] overflow-auto">
                {logs?.map(log => (
                  <li
                    key={log.id}
                    className="flex items-center justify-between border p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {format(new Date(log.date), "PPP")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.weight ? `${log.weight}kg` : ""}
                        {log.bodyFat ? ` - ${log.bodyFat}% BF` : ""}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(log.id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Weight Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateFormatted" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    stroke="#8884d8"
                    name="Weight (kg)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bodyFat"
                    stroke="#82ca9d"
                    name="Body Fat (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
