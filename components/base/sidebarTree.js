import { Box, Text } from '@chakra-ui/react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const SidebarTree = ({ treeData, onLoadData }) => {
  return (
    <Box
      w="100%"
      maxW={{ base: 'calc(100vw - 50px)', md: '100vw' }}
      overflow="hidden"
      wordBreak="break-word"
      order={{ base: 2, md: 1 }}
      zIndex={100}
      border="1px"
      borderColor="#EBEBEB"
      borderRadius="15px"
      p="10px"
      height="min-content"
      dir="rtl" // ✅ RTL direction
    >
      <Text fontWeight="bold" fontSize="16px" mb={4}>
        موضوعات
      </Text>
      <Tree
        treeData={treeData}
        loadData={onLoadData}
        defaultExpandAll={false}
        showIcon={false}
        height={400}
        switcherIcon={({ expanded, isLeaf }) =>
          !isLeaf ? (
            expanded ? (
              <FiChevronDown style={{ marginInlineEnd: 8 }} />
            ) : (
              <FiChevronRight style={{ marginInlineEnd: 8 }} />
            )
          ) : null
        }
      />
    </Box>

  )
}

export default SidebarTree
