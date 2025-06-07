"use client";
import Form from "@/components/abusePrevention/Form";
import FormSkeleton from "@/components/abusePrevention/FormSkeleton";
import { withSkeleton } from "@/components/WithSkeleton";

const FormWithSkeleton = withSkeleton(Form, FormSkeleton);

export default FormWithSkeleton;
