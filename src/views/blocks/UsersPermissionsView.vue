<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import UserManagementBlock from '@/components/blocks/users-permissions/UserManagementBlock.vue'
import code0 from '@/components/blocks/users-permissions/UserManagementBlock.vue?raw'
import PermissionsMatrixBlock from '@/components/blocks/users-permissions/PermissionsMatrixBlock.vue'
import code1 from '@/components/blocks/users-permissions/PermissionsMatrixBlock.vue?raw'
const examples = [
  {
    id: 'user-management',
    title: 'User management',
    description:
      'Find users by name, email, or role, invite new people, change roles, and suspend, reactivate, or remove accounts.',
    component: UserManagementBlock,
    code: code0,
  },
  {
    id: 'permissions-matrix',
    title: 'Roles and permissions',
    description:
      'Grant permissions to each role by module, review unsaved changes, then save or discard them together.',
    component: PermissionsMatrixBlock,
    code: code1,
  },
]
const usage = [
  'Row actions open from one Menu per table. Suspending and removing ask for confirmation, and the last active admin cannot be suspended, removed, or moved to another role, so someone can always manage access.',
  'The invite and change-role dialogs and the shared role helpers live in users-permissions/ next to the table. Copy them with the user management block.',
  'The permissions matrix is a native table so every checkbox has a role and permission name, and row and column headers are announced. Admin is locked to every permission.',
  'Enforce roles and the last-admin rule on the server as well; these previews only update local state.',
]
</script>

<template>
  <BlockDoc
    title="Users and permissions"
    description="Patterns for managing team access and deciding what each role can do."
    :usage="usage"
    :examples="examples"
  />
</template>
