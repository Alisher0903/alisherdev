import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Loader2Icon } from "lucide-react";

import CustomInput from "@/components/utility/custom-input";
import CustomTextarea from "@/components/utility/custom-textarea";
import ScreenReaderOnly from "@/components/accessibility/screen-reader-only";
import { type FormiKInputFieldProps } from "@/utility/types";
import { useAnnounce } from "@/hooks/use-announce";

export const mailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  name: Yup.string().required("Name required"),
  subject: Yup.string().required("Subject required"),
  message: Yup.string().required("Message required"),
});

export type ContactFormValues = Yup.InferType<typeof mailValidationSchema>;

export type FormFields = {
  name: keyof ContactFormValues;
  label: string;
  type: "text";
  fieldType: "text" | "textarea";
  placeholder: string;
};

const FormFieldsData: FormFields[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    fieldType: "text",
    placeholder: "Email",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    fieldType: "text",
    placeholder: "Name",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    fieldType: "text",
    placeholder: "Subject",
  },
  {
    name: "message",
    label: "Message",
    type: "text",
    fieldType: "textarea",
    placeholder: "Message",
  },
];

const initialFormValues: ContactFormValues = {
  email: "",
  name: "",
  message: "",
  subject: "",
};

export interface ContactFormProps {
  isSubmitting: boolean;
  // eslint-disable-next-line
  handleSubmit: (values: ContactFormValues) => Promise<void>;
}

export default function ContactForm({
  isSubmitting,
  handleSubmit,
}: ContactFormProps) {
  const announce = useAnnounce();

  const handleFormSubmit = async (values: ContactFormValues) => {
    try {
      await handleSubmit(values);
      announce("Message sent successfully", "assertive");
    } catch (error) {
      announce("Failed to send message. Please try again.", "assertive");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        validationSchema={mailValidationSchema}
        onSubmit={handleFormSubmit}
        validateOnChange
      >
        <Form className="mt-6 flex flex-col gap-3" noValidate>
          <ScreenReaderOnly>
            <div aria-live="polite" aria-atomic="true">
              Contact form. All fields are required.
            </div>
          </ScreenReaderOnly>

          {FormFieldsData.map((form) => {
            const isRequired = true; // All fields are required based on schema

            return (
              <div key={form.name} className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor={form.name}
                    className="inline font-medium text-background"
                  >
                    {form.label}
                    {isRequired && (
                      <>
                        <span className="ml-1 text-red-400" aria-hidden="true">
                          *
                        </span>
                        <ScreenReaderOnly>(required)</ScreenReaderOnly>
                      </>
                    )}
                  </label>
                </div>
                <div className="relative">
                  <Field name={form.name}>
                    {({ field, meta }: FormiKInputFieldProps<string>) => {
                      const hasError = Boolean(meta.touched && meta.error);
                      const errorId = hasError
                        ? `${form.name}-error`
                        : undefined;

                      return form.fieldType === "text" ? (
                        <>
                          <CustomInput
                            id={form.name}
                            {...field}
                            type={form.type}
                            placeholder={form.placeholder}
                            autoComplete={
                              form.name === "email" ? "email" : "off"
                            }
                            aria-invalid={hasError}
                            aria-describedby={errorId}
                            aria-required={isRequired}
                          />
                          {hasError && (
                            <span
                              id={errorId}
                              role="alert"
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm"
                            >
                              {meta.error}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <CustomTextarea
                            id={form.name}
                            {...field}
                            placeholder={form.placeholder}
                            aria-invalid={hasError}
                            aria-describedby={errorId}
                            aria-required={isRequired}
                            rows={4}
                          />
                          {hasError && (
                            <span
                              id={errorId}
                              role="alert"
                              className="absolute right-4 top-4 text-xs font-bold text-red-400 md:text-sm"
                            >
                              {meta.error}
                            </span>
                          )}
                        </>
                      );
                    }}
                  </Field>
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-background px-4 py-3 text-center text-lg font-semibold text-accent transition-colors duration-150 hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-accent disabled:cursor-not-allowed disabled:bg-background/80"
            disabled={isSubmitting}
            aria-describedby="submit-button-description"
          >
            {isSubmitting ? (
              <div className="inline-flex items-center space-x-2">
                <Loader2Icon
                  className="animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                <span>Sending message...</span>
              </div>
            ) : (
              <span>Send Message</span>
            )}
          </button>

          <ScreenReaderOnly>
            <div id="submit-button-description">
              Press to submit the contact form. All fields must be filled out
              correctly.
            </div>
          </ScreenReaderOnly>
        </Form>
      </Formik>
    </>
  );
}
