'use client'

import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import "../globals.css";
import { Setting } from "@/components/Icon/Setting";
import { settingItems } from "./items";


export default function Settings() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <><Button isIconOnly color="default" aria-label="Like" onClick={onOpen}>
            <Setting />
        </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
                            <ModalBody>
                                {settingItems.map((item) => (
                                    <Input
                                        key={item.name}
                                        type={item.type}
                                        label={item.label}
                                        value={item.defaultValue as unknown as string}
                                    />
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    );
}
