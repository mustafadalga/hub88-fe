import ApolloProvider from "@/graphql/ApolloProvider.tsx";
import Countries from "@/pages/Countries.tsx";

function App() {
    return (
        <ApolloProvider>
            <Countries/>
        </ApolloProvider>
    )
}

export default App
