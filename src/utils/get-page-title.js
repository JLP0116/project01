import defaultSettings from '@/settings'

const title = defaultSettings.title || '梦学谷博客权限管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
