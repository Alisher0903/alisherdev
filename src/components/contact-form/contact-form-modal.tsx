import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Dialog, Transition } from "@headlessui/react";
import { MailIcon, XIcon } from "lucide-react";

import ContactForm, {
  type ContactFormValues,
} from "@/components/contact-form/contact-form";
import ContactMailToast, {
  type MailSentToastState,
} from "@/components/contact-form/contact-mail-toast";
import { useFocusTrap } from "@/hooks/use-focus-trap";

import emailjs from "emailjs-com";

export interface ContactFormModelProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ContactFormModal({
  showModal,
  setShowModal,
}: ContactFormModelProps) {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [toastState, setToastState] = useState<MailSentToastState>({
    type: null,
    value: false,
    message: "",
  });
  const containerRef = useFocusTrap(
    showModal,
  ) as React.RefObject<HTMLDivElement>;
  const serviceId = "service_2u82mx5";
  const templateId = "template_4t0jhw1";
  const userId = "bYjumgKvea_9_8s6R";

  useEffect(() => {
    emailjs.init(userId);
  }, []);

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSendingMail(true);
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        values,
        userId,
      );
      console.log(response.text);

      if (response.text === "OK") {
        setToastState({
          type: "success",
          value: true,
          message: "Successfully sent email",
        });
        setShowModal(false);
      } else {
        setToastState({
          type: "warning",
          value: true,
          message: "Oop! Unable to send email",
        });
      }
    } catch (error) {
      setToastState({
        type: "failure",
        value: true,
        message: "Oop! Unable to send email",
      });
    } finally {
      setIsSendingMail(false);
    }
  };

  return (
    <>
      <Transition show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="z-[999999]"
          onClose={() => setShowModal(false)}
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-zinc-600/30 backdrop-blur-md"
              aria-hidden="true"
            />
          </Transition.Child>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                ref={containerRef}
                className="w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-accent/20 bg-accent px-6 py-8 shadow-lg shadow-accent/10 md:px-10 md:py-16"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    id="contact-modal-title"
                    className="flex items-center gap-1 text-2xl font-semibold text-background sm:gap-2 md:text-4xl"
                  >
                    <MailIcon
                      className="h-8 w-8 sm:h-10 sm:w-10"
                      aria-hidden="true"
                    />
                    <span>Send Message</span>
                  </Dialog.Title>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background p-2 text-sm text-accent transition-transform hover:scale-[1.05] hover:bg-background focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-accent"
                    onClick={() => setShowModal(false)}
                    aria-label="Close contact form"
                  >
                    <XIcon
                      className="h-full w-full text-accent"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div id="contact-modal-description" className="sr-only">
                  Contact form modal. Fill out all required fields to send a
                  message.
                </div>

                <ContactForm
                  isSubmitting={isSendingMail}
                  handleSubmit={handleSubmit}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <ContactMailToast toastState={toastState} showToast={setToastState} />
    </>
  );
}
