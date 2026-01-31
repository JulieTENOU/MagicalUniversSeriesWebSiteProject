import React, { createContext, useContext, useMemo } from "react";

const CharacterContext = createContext(null);

export function CharacterProvider({ character, setCharacter, children }) {
    const api = useMemo(() => {
        const patchCharacter = (patch) => {
            setCharacter((prev) => ({ ...prev, ...patch }));
        };

        const patchField = (field, value) => {
            setCharacter((prev) => ({ ...prev, [field]: value }));
        };

        return { character, patchCharacter, patchField };
    }, [character, setCharacter]);

    return (
        <CharacterContext.Provider value={api}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacter() {
    const ctx = useContext(CharacterContext);
    if (!ctx) throw new Error("useCharacter must be used within CharacterProvider");
    return ctx;
}
