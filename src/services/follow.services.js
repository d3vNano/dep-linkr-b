function isFollowing(followExists) {
    let result;

    if (followExists.rowCount === 0) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

export { isFollowing };
