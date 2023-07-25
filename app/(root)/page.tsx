"use client"

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () =>{
    return (
      <div className="p-4"> 
        <Modal title="Test" description="Test desc" isOpen onClose={()=>{}}  >
          Children
        </Modal>
      </div>
        )
  }

export default SetupPage;
  