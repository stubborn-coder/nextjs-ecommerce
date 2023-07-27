"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {

    const StoreModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            name: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        //TODO: create forms
    }

    return (
        <Modal title="Create Store" description="store description" isOpen={StoreModal.isOpen} onClose={StoreModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-comerce" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        </form>
                        <div className="pt-5 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={StoreModal.onClose}>Cancel</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}