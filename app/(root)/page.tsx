"use client"

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const SetupPage = () =>{
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);
    // const storeModal = useStoreModal(); doesn't work fine inside of useEffect

    useEffect(() => {
      if(!isOpen){
        onOpen();
      }
    }, [isOpen,onOpen])
    
    return (
      <div className="p-4"> 
        Root Pages
      </div>
        )
  }

export default SetupPage;
  