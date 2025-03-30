import Welcome from "@/components/home/welcome";
import About from "@/components/home/about";
import Services from "@/components/home/services";

export default function Home() {
    return (
        <main>
            <Welcome />
            <About />
            <Services />
        </main>
    );
}
