"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {

    const StoreModal = useStoreModal();
    return (
        <Modal title="Create Store" description="store description" isOpen={StoreModal.isOpen} onClose={StoreModal.onClose}>
            Create Store form
        </Modal>
    )
}