async function isFollowing(followExists) {
    let result;

    if (followExists.rowCount === 0) {
        result = false;
    } else {
        result = true;
    }
    return result;
}

export { isFollowing };
