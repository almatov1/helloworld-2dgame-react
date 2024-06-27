import UsersModel from "../../user/model/UsersModel";
import UserComponent from "../../user/ui/UserComponent";

function MapComponent(args: UsersModel) {
    return (
        args.users.map((user, index) => <div key={index}>{UserComponent(user)}</div>)
    );
}

export default MapComponent;