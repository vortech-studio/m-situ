import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";
import { accountState } from "../../recoil/account";
import { getAccount, signInUser } from "../../services/user";
import Link from "next/link";

export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const setAccount = useSetRecoilState(accountState);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Please input an email"),
    password: Yup.string()
      .min(6, "Password should be 6 or more characters")
      .required("Please input a password"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const uid = await signInUser({
        email: values.email,
        password: values.password,
      });
      // TODO: Set up account for first time login
      // const account = await getAccount(uid);
      // setAccount(account);
      toast({
        title: "Success",
        description: "Logged in successfuly",
        status: "success",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="space-y-4">
            <img className="h-16 w-auto" src="/images/logo.jpeg" alt="M-Situ" />
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        validate={(value) => {
                          let error;

                          if (value.length < 6) {
                            error =
                              "Password must contain at least 6 characters";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      backgroundColor={"#239068"}
                      _hover={{ bg: "#106647" }}
                      textColor={"white"}
                      className="w-full"
                    >
                      Sign in
                    </Button>
                    <div className="ml-auto text-sm leading-6">
                      <Link
                        href="/auth/sign-up"
                        className="font-semibold text-primary underline"
                      >
                        Create an account
                      </Link>
                    </div>
                  </VStack>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/images/forest.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
