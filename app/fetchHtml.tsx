import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchHTML = async (url: string, cookies: string): Promise<string> => {
    try {
        const response = await axios.get(url, {
            headers: {
                Cookie: cookies, // Add cookies directly to headers
            },
        });
        return response.data; // Return the raw HTML content

    } catch (error) {
        console.error("Error fetching protected page:", error);
        return "error";
    }
};

export default fetchHTML;
