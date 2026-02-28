// components/PageLoader.jsx
import BG from "./Background";
import Loader from "./Loader";

export default function PageLoader() {
    return (
        <div className="main">
            <BG />
            <Loader />
        </div>
    );
}