import { JSX } from "react";
import Navbar from "./Navbar";
import {  ThemeProvider } from "./ThemeProvider";
import ThemeContent from "./Themecontext";

export default function ContextPage(): JSX.Element {
    return (
        <ThemeProvider>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Navbar/>
                <main className="flex-1 w-full">
                    <ThemeContent />
                </main>
            </div>
            
            
        
            
        </ThemeProvider>
    );
}