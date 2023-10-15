"use client"
import { LANGUAGE_CODES } from "@/utils/LanguageCodes"


function LanguageSelector({ target, setTarget }: { target: string, setTarget: Function }) {
    const languageOptions = LANGUAGE_CODES.map((language: any, index: any) => {
        return <option className="text-gray-700" key={index} value={language.code}>{language.language}</option>
    })

    const handleLanguageChange = (e: any) => {
        setTarget(e.target.value)
    }

    const languageSelect = <select className="w-24 h-12 rounded-xl shadow-d" value={target} onChange={(e) => handleLanguageChange(e)}>{languageOptions}</select>
    return (
        languageSelect
    );
}

export default LanguageSelector;