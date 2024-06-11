import { fetchJson } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSignOut() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () =>
            fetchJson("/api/logout")
    });

    return async () => {
        await mutation.mutateAsync();
        queryClient.setQueryData(["user"], undefined);
    }
}