"use client";
import Form from "@/components/Form";
import FormSkeleton from "@/components/FormSkeleton";
import { withSkeleton } from "@/components/WithSkeleton";

const FormWithSkeleton = withSkeleton(Form, FormSkeleton);

export default FormWithSkeleton;
