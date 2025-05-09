
import { useState } from "react";


export function ImportContact() {
    const [contact, setContact] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return; 

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split(/\r?\n/).map((line) => line.trim());
            // Remove empty lines and trim whitespace
           const filteredLines = lines.filter((line) => 
            /^\d{10,13}$/.test(line) // Adjust the regex as needed
            );
            setContact(filteredLines);
        }
         reader.readAsText(file);
    }

    return (

        <div className="space-y-4">
            <label > Importar contatos (.txt)</label>
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
        </div>
    )
}
