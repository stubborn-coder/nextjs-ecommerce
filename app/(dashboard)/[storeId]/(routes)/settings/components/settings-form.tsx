"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";



interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),

});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FunctionComponent<SettingsFormProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const origin = useOrigin();
    
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            const response = await axios.patch(`/api/stores/${params.storeId}`,data);
            router.refresh();
            toast.success("store updated");
            console.log(response.data);
            
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }


    const onDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");          
            toast.success("store deleted successfully");
        } catch (error) {
            toast.error("make sure you remove all products and categories first!");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={()=> setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={()=> setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">

                        <FormField
                            control={form.control}
                            name = "name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Names</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field} />                                  
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>

            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
     );
}
 
export default SettingsForm;