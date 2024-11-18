import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import FetchHtml from "@/app/fetchHtml";

function Index() {
    const [htmlContent, setHtmlContent] = useState<string>("Loading...");

    useEffect(() => {
        const fetchHTML = async () => {
            const cookies = "cookie_name_1=cookie_value_1; cookie_name_2=cookie_value_2";
            const result = await FetchHtml("", cookies); // Call the async function
            setHtmlContent(result); // Set the result as the HTML content
        };

        fetchHTML();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ScrollView>
                <Text>{htmlContent}</Text>
            </ScrollView>
        </View>
    );
}

export default Index;