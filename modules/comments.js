/* eslint-disable prettier/prettier */
export let commentsData = [];
export const updateCommentsData = (newCommentsData) => {
    commentsData.length = 0;
    commentsData.push(...newCommentsData);
};
