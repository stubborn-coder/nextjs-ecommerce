"use client";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ApiList } from "@/components/ui/api-list";


interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FunctionComponent<OrderClientProps> = ({ 
    data
}) => {



    return (
        <>

            <Heading 
                title = {`Orders (${data.length})`}
                description="Manage Orders for your store"
            />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data}/>
            <Heading title="API" description="API calls for orders" />
        </>
    )
}