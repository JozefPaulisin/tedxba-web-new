"use client"
import { Field, Label, Input as HeadlessInput, Description } from "@headlessui/react";
import clsx from "clsx";

type InputProps = {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNameGen?: string;
    className?: string;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
};

const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
    classNameGen,
    className,
    label,
    description,
    error,
    disabled,
    name,
    id,
}: InputProps) => {
    return (
        <Field className={`flex flex-col gap-1 ${classNameGen}`}>
            {label && (
                <Label className="text-sm font-medium text-txt-black-prim dark:text-txt-white-prim">
                    {label}
                </Label>
            )}
            <HeadlessInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                id={id}
                className={clsx(
                    "w-full h-12 px-4 text-lg font-light",
                    "bg-transparent",
                    "border border-border",
                    "text-txt-black-prim dark:text-txt-white-prim",
                    "placeholder:text-txt-black-ter dark:placeholder:text-txt-white-ter",
                    "outline-none",
                    "transition-colors duration-200",
                    "focus:border-txt-black-prim dark:focus:border-txt-white-prim",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                    error && "border-red focus:border-red",
                    className
                )}
            />
            {description && !error && (
                <Description className="text-sm font-light text-txt-black-ter dark:text-txt-white-ter">
                    {description}
                </Description>
            )}
            {error && (
                <p className="text-sm font-light text-red">
                    {error}
                </p>
            )}
        </Field>
    );
};

export default Input;