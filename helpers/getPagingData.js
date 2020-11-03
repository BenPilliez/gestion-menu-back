module.exports = {
    getPagingData(data, page, limit) {
        console.debug("app => helpers => getPagiationData");

        const {count: totalItems, rows: items} = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return {totalItems, items, totalPages, currentPage};
    }
}
