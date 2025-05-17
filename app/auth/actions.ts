"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { LoginSchema, RegisterSchema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
// import { generateVerificationToken } from "@/lib/token";
// import { sendVerificationEmail } from "@/lib/mail";

export const signUp = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate the input data
    const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { email, name, password, passwordConfirmation } = validatedData;

    // Check if passwords match
    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (userExists) {
      return { error: "Email already is in use. Please try another one." };
    }

    const lowerCaseEmail = email.toLowerCase();

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    // Generate Verification Token
    // const verificationToken = await generateVerificationToken(email);

    // await sendVerificationEmail(lowerCaseEmail, verificationToken.token);

    return { success: "Email Verification was sent" };
  } catch (error) {
    // Handle the error, specifically check for a 503 error
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};


export const signInAction = async (data: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.parse(data);

  if(!validatedData) {
      return { error: "Invalid input data"};
  }

  const {email, password} = validatedData;

  const userExists = await prisma.user.findFirst({
      where: {
          email: email,
      },
  });

  if(!userExists || !userExists.password || !userExists.email){
      return { error: "User not found"};
  }

  try {
      await signIn('credentials', {
          email: userExists.email,
          password: password,
          redirectTo: '/dashboard/overview/'
      })
  } catch (error) {
      if(error instanceof AuthError) {
          switch(error.type){
              case "CredentialsSignin":
                  return{error: "Invalid credentionals"};
              default:
                  return{error: "please confirm your email address"};
          }
      }

      throw error;
  }

  return { success: "User logged in successfully"};

}