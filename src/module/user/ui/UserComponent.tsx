import UserItemModel from "../model/UserItemModel";

function UserComponent(user: UserItemModel) {
    return (
        <div style={{
            position: 'absolute',
            top: user.y,
            left: user.x,
            width: 15,
            height: 15,
            backgroundColor: user.color
        }} />
    );
}

export default UserComponent;