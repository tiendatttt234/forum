import DefaultLayout from "../layouts/DefaultLayout";

const NotFoundScreen = () => {
    return (
        <DefaultLayout>
            <div>
                <img src="/404.jpg" alt="404" width="100%" className="img-404" />
                <h1 style={{textAlign: 'center'}} className="p-5">We cannot find the page you requested</h1>
            </div>
        </DefaultLayout>
    );
};

export default NotFoundScreen;
