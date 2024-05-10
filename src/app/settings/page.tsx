'use client'

import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import "../globals.css";
import { setting } from "@/components/settings/settings";
import { SettingIcon } from "@/components/icons";


export default function Settings() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const updateValue = new Map();


    const changeValue = (key: string, value: string) => {
        updateValue.set(key, value);
    }

    const settingItems = setting.allItem();

    const save = () => {
        updateValue.forEach((value, key) => {
            setting.setItems(key, value);
        })
        onClose();
    }

    return (
        <><div onClick={onOpen}>
            <SettingIcon className="text-default-500" />
        </div>
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
                                        defaultValue={item.value as unknown as string}
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
