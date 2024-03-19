'use client'

import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import "../globals.css";
import { Setting } from "@/components/Icon/Setting";
import { settingItems } from "./items";


export default function Settings() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const updateValue = new Map();


    const changeValue = (key: string, value: string) => {
        updateValue.set(key, value);
    }

    const save = () => {
        updateValue.forEach((value, key) => {
            localStorage.setItem(key, value);
        })
        onClose();
    }

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
                                        value={item.value as unknown as string}
                                        defaultValue={item.defaultValue as unknown as string}
                                        onChange={(event) => { changeValue(item.name, event.target.value) }}
                                    />
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={save}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    );
}
