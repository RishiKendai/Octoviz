import { useState } from 'react';
import { toast } from 'sonner';

function Search({ onsearch, classes }: { onsearch: (username: string) => void, classes: string }) {

    const [username, setUsername] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!username.trim()) {
                toast('Please enter a username.')
                return
            }
            onsearch(username);
        }
    };

    return (
        <div className={`relative ${classes}`}>
            <div className="absolute left-2 pl-2 text-(--text-light-100) z-1 top-2/4 -translate-y-2/4">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='currentColor' data-view-component="true" className="scale-150">
                    <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
                </svg>
            </div>
            <input
                className="w-full md:w-[561px] lg:w-[746px] flex-1 mr-2 rounded-3xl h-12 px-0.5 pl-[52px]"
                type="text"
                name="url"
                placeholder="GitHub username"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default Search