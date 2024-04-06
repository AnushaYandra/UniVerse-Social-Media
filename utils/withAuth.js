import { useRouter } from "next/router";
import { useAuthStore } from "../store/store";
import { useEffect, useState } from "react";


export const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const username = useAuthStore.getState().auth.username;

        if (!username) {
            router.push('/');
        }

    return children;
}