"use client";


import { useFormContext } from "react-hook-form";
import { Alert } from "..";

export function FormError() {
  const formContext = useFormContext();

  if (!formContext.formState.errors.root) return null;

  return (
    <Alert.Root variant="danger" className="itc-form-error">
      <Alert.Title className="itc-form-error-title">Erro:</Alert.Title>
      <Alert.Description className="itc-form-error-description">
        {formContext.formState.errors.root?.message}
      </Alert.Description>
    </Alert.Root>
  );
}
