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
import { createUser, getAccount, signInUser } from "../../services/user";
import Link from "next/link";

export default function Page() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Please input an email"),
    password: Yup.string()
      .min(6, "Password should be 6 or more characters")
      .required("Please input a password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please input a password"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await createUser({ email: values.email, password: values.password });
      router.push("/auth/sign-in");
      toast({
        title: "Success",
        description: "Account created successfuly",
        status: "success",
      });
    } catch (error) {
      showToast({
        toast,
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
              Create your account
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
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        variant="filled"
                      />
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      backgroundColor={"#239068"}
                      _hover={{ bg: "#106647" }}
                      textColor={"white"}
                      className="w-full"
                    >
                      Sign up
                    </Button>
                    <div className="ml-auto text-sm leading-6">
                      <Link
                        href="/auth/sign-in"
                        className="font-semibold text-primary underline"
                      >
                        Already have an account? Sign in
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
