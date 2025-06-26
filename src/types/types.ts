export interface DateRange {
    from: Date | null
    to: Date | null
  }

  export interface CustomCardProps {
    children: React.ReactNode
    className?: string
  }

  export interface SelectOption {
    value: string
    label: string
  }
  
  export interface CustomSelectProps {
    options: SelectOption[]
    defaultValue?: string
    placeholder?: string
    className?: string
  }

  export interface MobileMenuDrawerProps {
    open: boolean;
    onClose: () => void;
  }
export interface Question {
  id: string
  value: string
} 
  export interface SidebarTab {
    label: string;
    icon: React.ReactNode;
    route: string;
  }
  
  export interface SidebarProps {
    tabs: SidebarTab[];
    activeTab: string;
    onTabClick: (route: string) => void;
  }

  export interface TextEditorProps {
    titleLabel?: string;
    titlePlaceholder?: string;
    editorLabel?: string;
    editorPlaceholder?: string;
    showTitle?: boolean;
    title: string;
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editorValue: string;
    onEditorChange: (value: string) => void;
    name: string;
    titleError?: string;
  }

  export interface CustomCardContentProps {
    children: React.ReactNode
    className?: string
  }

  export interface WebsiteTabProps {
    websiteSubTab: string;
    setWebsiteSubTab: (tab: string) => void;
  }

  export interface UpgradeModalProps {
    isOpen: boolean
    onClose: () => void
  }

  export interface FileItem {
    file: File
    id: string
    isNew: boolean
  }

  export interface TextItem {
    id: string
    title: string
    content: string
    isNew?: boolean
  }
  
  export interface FilesTabProps {
    onFilesChange?: (files: FileItem[]) => void
  }
  export interface GlobalInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;
  }     
  export interface FeatureCardModalField {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    error?: string;
    afterInput?: React.ReactNode;
    beforeInput?: React.ReactNode;
    inputClassName?: string;
  }

  export interface FeatureCardModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: React.ReactNode;
    fields: FeatureCardModalField[];
    price: number;
    priceLabel?: string;
    showPrice?: boolean;
    note?: React.ReactNode;
    confirmText?: string;
    confirmDisabled?: boolean;
  }
  export interface FeatureCardProps {
    title: string
    price: string
    description: string
    toggleLabel?: string
    enabled: boolean
    onToggle: () => void
  }
  export interface SourceItem {
    id: string
    name: string
    size: number
    isNew?: boolean
  }
  export interface WebsiteCrawlLinkProps {
    url: string;
    onUrlChange: (url: string) => void;
    includePaths: string;
    onIncludePathsChange: (paths: string) => void;
    excludePaths: string;
    onExcludePathsChange: (paths: string) => void;
    hasContent: boolean;
    error?: string;
  }
  export interface SourcesListProps {
    items: SourceItem[]
    getFileIcon: (name: string) => React.ReactNode
    formatFileSize: (bytes: number) => string
    selectAll: boolean
    onSelectAll: (checked: boolean) => void
    selectedItems: string[]
    onSelectItem: (id: string) => void
    onDeleteItems: (ids: string[]) => void
  }
  export type OptionWithIcon = RegularOption & { icon?: React.ReactNode; image?: string };

  export type DropdownPropsWithIcon = Omit<DropdownProps, 'options'> & {
    options: OptionWithIcon[];
  };
  export interface SourcesSummaryProps {
    count: number
    totalSize: number
    maxSize?: number
    formatFileSize: (bytes: number) => string
  }

  export interface NavLinkItem {
    name: string;
    to: string;
    customActive?: (pathname: string) => boolean;
  }
  
  export interface NavLinksProps {
    links?: NavLinkItem[];
    activePath?: string;
    textSizeClass?: string;
  }

  export interface Message {
    id: number
    text: string
    isUser: boolean
  }

  export interface DateRangePickerProps {
    className?: string;
    dropdownDirection?: 'left' | 'right';
  }

  export interface DangerZoneProps {
    heading: string;
    description: string;
    buttonText: string;
    onConfirmDelete: () => void;
    maxDescriptionLength?: number;
    modalTitle: string;
    modalDescription: React.ReactNode;
    valueToConfirm?: string;
    modalInputLabel?: string;
    modalInputHelpText?: string;
  }

  export interface GeneralTabProps {
    creditLimitEnabled: boolean;
    setCreditLimitEnabled: (enabled: boolean) => void;
    creditLimit: number;
    setCreditLimit: (limit: number) => void;
  }

  export interface AgentGeneralTabProps {
    onDeleteTeam: () => void;
  }

  export interface AITabProps {
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    isModelDropdownOpen: boolean;
    setIsModelDropdownOpen: (open: boolean) => void;
    instructionType: string;
    setInstructionType: (type: string) => void;
    instructions: string;
    setInstructions: (instructions: string) => void;
    temperature: number;
    setTemperature: (temp: number) => void;
  } 

  export interface SecurityTabProps {
    visibility: string;
    setVisibility: (visibility: string) => void;
    allowSpecificDomains: boolean;
    setAllowSpecificDomains: (allow: boolean) => void;
    domains: string;
    setDomains: (domains: string) => void;
    messageLimit: number;
    setMessageLimit: (limit: number) => void;
    messageLimitInterval: number;
    setMessageLimitInterval: (interval: number) => void;
    limitMessage: string;
    setLimitMessage: (message: string) => void;
  }

  export interface RegularOption {
    value: string;
    label: string;
    image?: string;
  }
  
  export interface TitleOption {
    isTitle: true;
    label: string;
  }
  
  export type Option = RegularOption | TitleOption;
  
  export interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    fullWidth?: boolean;
    searchable?: boolean;
    dropdownWidth?: string;
  }
  export interface SourcesManagerProps {
    items: SourceItem[];
    title: string;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedItems: string[];
    onSelectItem: (id: string) => void;
    onSelectAll: (checked: boolean) => void;
    onDeleteItems: (ids: string[]) => void;
    onRestore?: () => void;
    getItemIcon: (item: SourceItem) => React.ReactNode;
    formatItemDetails?: (item: SourceItem) => string;
    showRestore?: boolean;
    emptySearchMessage?: string;
  }
  export interface LeadsTabProps {
    title: string;
    setTitle: (title: string) => void;
    nameEnabled: boolean;
    setNameEnabled: (enabled: boolean) => void;
    name: string;
    setName: (name: string) => void;
    emailEnabled: boolean;
    setEmailEnabled: (enabled: boolean) => void;
    email: string;
    setEmail: (email: string) => void;
    phoneEnabled: boolean;
    setPhoneEnabled: (enabled: boolean) => void;
    phone: string;
    setPhone: (phone: string) => void;
  }
  export interface NotionConnectModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
    className?: string;
    onReset?: () => void;
    showReset?: boolean;
    isHalfWidth?: boolean;
    name?: string;
  }

  export interface TabContentPanelProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    showActionButton?: boolean;
    actionButtonText?: string;
    onActionClick?: () => void;
    className?: string;
  }

  export interface UploadingFile {
    name: string;
    progress: number;
  }
  export interface FileUploadingProps {
    files: Array<{
      name: string
      progress: number
    }>
    onRemove: (fileName: string) => void
  }
  export interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    Icon?: React.ElementType;
    confirmButtonClass?: string;
  }

  export interface MembersTabProps {
    onInviteMembers: () => void;
  }

  export interface WebhookTabProps {
    webhooks: any[]
    onCreateWebhook: () => void
  } 

  export interface PricingTier {
    name: string
    monthlyPrice: number
    yearlyPrice: number
    isPopular?: boolean
    features: Array<{
      text: string
      isLink?: boolean
    }>
  }
  export interface PopoverHoverProps {
    children: React.ReactNode; 
    content: React.ReactNode; 
    className?: string;
  }
  export interface CustomDomainsTabProps {
    onAddDomain: (domain: string) => void
  }

  export interface ChatInterfaceTabProps {
    onSave: () => void
  }

  export interface IntegrationProps {
    imageUrl?: string;
    title: string;
    description: string;
    customIcon?: React.ReactNode;
  }

  export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: React.ReactNode;
    valueToConfirm?: string;
    inputLabel?: string;
    inputHelpText?: string;
  }

  export interface WebsiteCrawlLinkProps {
    // ... existing code ...
  }

  export  interface NotificationsTabProps {
    onSave: () => void
  }

  export interface NumberInputProps {
    value: number
    onChange: (value: number) => void
    width?: string
    className?: string
  }

  export interface CreditHistory {
    date: string;
    description: string;
  }