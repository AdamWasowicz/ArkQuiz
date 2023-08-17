"use client"
import { useState } from "react";
import { ChangeEvent } from "react";
import { CharacterHeaderMap, CharacterHeader } from "../lib/types";
import { getCharacterIconRoute, getCharacterSplashRoute } from "../lib/utils";
import Image from "next/image";

interface ISearchBar {
    a: CharacterHeaderMap
}

const SearchBar: React.FC<ISearchBar> = (props) => {
    const [inputContent, setInputContent] = useState<string>('');

    const handleInputContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputContent(event.target.value); 
    }

    const test = (): CharacterHeader[] => {
        if (inputContent.length > 0){
            const values = props.a.get(inputContent[0].toUpperCase())
            const filteredValues = values?.filter(item => {
                return item.Name.toUpperCase().startsWith(inputContent.toUpperCase());
            })

            return filteredValues!;
        }
        else {
            return []
        }
    }

    const localUrl = 'http://localhost:3000';

    return (
        <div>
            <input 
                type='text'
                onChange={handleInputContentChange}
                value={inputContent}
            />

            <div>
                
            </div>
        </div>
    )
}

export default SearchBar;