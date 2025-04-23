// components/Pagination.js
import React from 'react';
import { HStack, IconButton, Button, Text } from '@chakra-ui/react';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxButtons = 5;
  const getPageNumbers = () => {
    const pages = [];

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) {
      pages.push('left-ellipsis');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('right-ellipsis');
    }

    return pages;
  };

  return (
    <HStack spacing={1} mt={4} justify="center" wrap="wrap">

      <Button
        onClick={() => onPageChange(1)}
        variant={currentPage === 1 ? 'solid' : 'outline'}
        colorScheme={currentPage === 1 ? 'blue' : 'gray'}
        size="sm"
      >
        1
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === 'left-ellipsis' || page === 'right-ellipsis' ? (
          <Text key={page + idx} px={2}>
            ...
          </Text>
        ) : (
          <Button
          
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'solid' : 'outline'}
            bgColor={currentPage == page ? '#29CCCC' : 'white'}
            borderColor={'gray.200'}
            // colorScheme={currentPage === page ? '#29CCCC' : 'gray'}
            size="sm"
          >
            {page}
          </Button>
        )
      )}

      {totalPages > 1 && (
        <Button
          onClick={() => onPageChange(totalPages)}
          variant={currentPage === totalPages ? 'solid' : 'outline'}
          bgColor={currentPage == totalPages ? '#29CCCC' : 'white'}
            borderColor={'gray.200'}
          size="sm"
        >
          {totalPages}
        </Button>
      )}

        <Button colorScheme='gray' variant={'outline'} onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage === totalPages} size={'sm'}>
          صفحه بعد
        </Button>

   
    </HStack>
  );
};

export default Pagination;
