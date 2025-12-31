import React from 'react'

const Pagination = ({
    currentPage,
    totalPages,
    totalElements,
    itemsPerPage = 10,
    onPageChange
}) => {

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
            onPageChange(newPage);
        }
    }

    if (totalPages <= 1) {
        return null;
    }

    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, totalElements);

    return (
        <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 border border-gray-200'>
            <div className='text-sm text-gray-600'>
                Showing <span className='font-semibold text-gray-800'>{startItem}-{endItem}</span> of{' '}
                <span className='font-semibold text-gray-800'>{totalElements}</span> items
            </div>

            <div className='flex items-center gap-2'>

                <button
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                    className={`px-3 py-2 rounded-md transition ${currentPage === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                        }`}
                    title="First page"
                >
                    &laquo;
                </button>

                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`px-3 py-2 rounded-md transition ${currentPage === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                        }`}
                    title="Previous page"
                >
                    &lsaquo;
                </button>

                <div className='flex gap-1 flex-wrap justify-center'>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`px-3 py-2 rounded-md transition min-w-[40px] ${currentPage === index
                                    ? 'bg-green-600 text-white font-semibold'
                                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`px-3 py-2 rounded-md transition ${currentPage === totalPages - 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                        }`}
                    title="Next page"
                >
                    &rsaquo;
                </button>

                <button
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`px-3 py-2 rounded-md transition ${currentPage === totalPages - 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                        }`}
                    title="Last page"
                >
                    &raquo;
                </button>
            </div>
        </div>
    )
}

export default Pagination
