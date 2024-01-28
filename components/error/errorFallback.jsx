import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineError } from "react-icons/md";
import { useRouter } from "next/router";

function ErrorFallback({ error, resetErrorBoundary }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          resetErrorBoundary();
          setOpen(false);
        }}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex items-center justify-center rounded-full ">
                  <MdOutlineError
                    className="h-16 w-16 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-red-400"
                  >
                    {error === 403 ? "Access Denied" : "Something went wrong."}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-custom-black">
                      {error === 403
                        ? "You do not have access to this page"
                        : "Our engineers are working on it."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <button
                  type="button"
                  className="hover:bg-red-400-dark inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none"
                  onClick={() => {
                    resetErrorBoundary();
                    setOpen(false);
                  }}
                >
                  Go Back
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ErrorFallback;
