import { Box, Text } from '@chakra-ui/react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SidebarTree = ({ treeData, onLoadData , t , setCategoryId }) => {
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
        {t('topics')}
      </Text>
      <Tree
      className="custom-tree"
        treeData={treeData}
        loadData={onLoadData}
        defaultExpandAll={false}
        showIcon={false}
        height={400}
        onSelect={(selectedKeys, e) => {
          const node = e.node;
          setCategoryId(node.key);
        }}
        switcherIcon={({ expanded, isLeaf }) =>
          !isLeaf ? (
            expanded ? (
              <FiChevronDown style={{ marginInlineEnd: 8 }} />
            ) : (
              <FiChevronLeft style={{ marginInlineEnd: 8 }} />
            )
          ) : null
        }
      />
    </Box>

  )
}

export default SidebarTree
