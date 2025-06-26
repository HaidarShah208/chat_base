import React, { useState } from "react";
import type { WebsiteTabProps } from "../../types/types";
import WebsiteCrawlLink from "../WebsiteCrawlLink";
import GlobalInput from "../Form/GlobalInput";
import { useFormik } from "formik";
import SourcesManager from "../SourcesManager";
import { Link as LinkIcon, Globe, Loader2, Network } from "lucide-react";

const WebsiteTab: React.FC<WebsiteTabProps> = ({ websiteSubTab, setWebsiteSubTab }) => {
  const [linkSources, setLinkSources] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      individualUrl: "",
      crawlUrl: "",
      includePaths: "",
      excludePaths: "",
    },
    validate: (values) => {
      const errors: { individualUrl?: string; crawlUrl?: string } = {};
      const urlRegex = /^(ftp|http|https):\/\/[^ "']+$/;

      if (websiteSubTab === 'individual' && values.individualUrl && !urlRegex.test(values.individualUrl)) {
        errors.individualUrl = 'Invalid URL format';
      }

      if ((websiteSubTab === 'crawl' || websiteSubTab === 'sitemap') && values.crawlUrl && !urlRegex.test(values.crawlUrl)) {
        errors.crawlUrl = 'Invalid URL format';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      let newSource: any;
      if (websiteSubTab === 'individual') {
        newSource = {
          id: Math.random().toString(36).substr(2, 9),
          url: values.individualUrl,
          type: 'individual',
          isNew: true,
          addedAt: Date.now(),
        };
      } else if (websiteSubTab === 'sitemap') {
        newSource = {
          id: Math.random().toString(36).substr(2, 9),
          url: values.crawlUrl,
          type: 'sitemap',
          isNew: true,
          addedAt: Date.now(),
        };
      } else if (websiteSubTab === 'crawl') {
        newSource = {
          id: Math.random().toString(36).substr(2, 9),
          url: values.crawlUrl,
          type: 'crawl',
          isNew: true,
          addedAt: Date.now(),
          linksCount: 1,
        };
      }
      setLinkSources(prev => [newSource, ...prev]);
      resetForm();
      setIsLoading(false);
      setTimeout(() => {
        setLinkSources(prev => prev.map(item => item.id === newSource.id ? { ...item, isNew: false } : item));
      }, 3000);
    },
  });

  const individualHasContent = formik.values.individualUrl.trim() !== "";
  const crawlHasContent = formik.values.crawlUrl.trim() !== "" || formik.values.includePaths.trim() !== "" || formik.values.excludePaths.trim() !== "";

  const filteredSources = linkSources.filter(item =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSources = [
    ...filteredSources.filter(i => i.type === 'individual'),
    ...filteredSources.filter(i => i.type === 'sitemap'),
    ...filteredSources.filter(i => i.type === 'crawl'),
  ];

  const sourceItems = sortedSources.map(item => ({
    id: item.id,
    name: item.url,
    size: 0,
    isNew: item.isNew,
    type: item.type,
    linksCount: item.linksCount,
    addedAt: item.addedAt,
  }));

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(sourceItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleDeleteItems = (ids: string[]) => {
    setLinkSources(prev => prev.filter(item => !ids.includes(item.id)));
    setSelectedItems(prev => prev.filter(id => !ids.includes(id)));
  };
  const handleRestore = () => {
    setSelectedItems([]);
  };

  const getItemIcon = (item: any) => {
    if (item.type === 'individual') {
      return <div className="w-9 h-9 bg-[#F4F4F5] rounded-full flex items-center justify-center"><LinkIcon className="w-5 h-5 text-gray-500" /></div>;
    } else if (item.type === 'sitemap') {
      return <div className="w-9 h-9 bg-[#F4F4F5] rounded-full flex items-center justify-center"><Network className="w-5 h-5 text-gray-500" /></div>;
    } else if (item.type === 'crawl') {
      return <div className="w-9 h-9 bg-[#F4F4F5] rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-gray-500" /></div>;
    }
    return null;
  };

  const formatItemDetails = (item: any) => {
    if (item.type === 'individual') {
      return 'Last scraped Just now';
    } else if (item.type === 'sitemap') {
      return 'Last crawled Just now';
    } else if (item.type === 'crawl') {
      return `Last crawled Just now${item.linksCount ? ` • Links: ${item.linksCount}` : ''}`;
    }
    return '';
  };

  return (
    <>
      <div className="bg-white rounded-xl mb-6 border p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Link</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Crawl specific web pages or submit sitemaps to continuously update your AI with the latest content.
          Configure included and excluded paths to refine what your AI learns.
          <a href="#" className="underline">Learn more</a>
        </p>
        <div className="mb-6">
          <nav className="flex">
            <button
              type="button"
              onClick={() => setWebsiteSubTab('crawl')}
              className={`flex-1 pb-2 text-sm bg-transparent focus:outline-none font-medium relative text-center ${websiteSubTab === 'crawl' ? 'text-black' : ''}`}
            >
              Crawl links
              {websiteSubTab === 'crawl' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#71717B]"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setWebsiteSubTab('sitemap')}
              className={`flex-1 pb-2 text-sm bg-transparent focus:outline-none font-medium relative text-center ${websiteSubTab === 'sitemap' ? 'text-black' : ''}`}
            >
              Sitemap
              {websiteSubTab === 'sitemap' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#71717B]"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setWebsiteSubTab('individual')}
              className={`flex-1 pb-2 text-sm bg-transparent focus:outline-none font-medium relative text-center ${websiteSubTab === 'individual' ? 'text-black' : ''}`}
            >
              Individual link
              {websiteSubTab === 'individual' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#71717B]"></div>
              )}
            </button>
          </nav>
          <div className="border-b border-gray-200 "></div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {(websiteSubTab === 'crawl' || websiteSubTab === 'sitemap') && (
            <WebsiteCrawlLink
              url={formik.values.crawlUrl}
              onUrlChange={(value) => formik.setFieldValue('crawlUrl', value)}
              includePaths={formik.values.includePaths}
              onIncludePathsChange={(value) => formik.setFieldValue('includePaths', value)}
              excludePaths={formik.values.excludePaths}
              onExcludePathsChange={(value) => formik.setFieldValue('excludePaths', value)}
              hasContent={crawlHasContent}
              error={formik.touched.crawlUrl && formik.errors.crawlUrl ? formik.errors.crawlUrl : undefined}
              buttonLabel={websiteSubTab === 'sitemap' ? "Load sitemap" : isLoading ? <div className="flex items-center gap-2"><Loader2 className='w-4 h-4 animate-spin'/> Fetch links</div> : "Fetch links"}
            />
          )}
          {websiteSubTab === 'individual' && (
            <div className="space-y-4">
              <GlobalInput
                label="Individual URL"
                type="url"
                placeholder="https://www.example.com/specific-page"
                className="focus:ring-0"
                value={formik.values.individualUrl}
                onChange={formik.handleChange}
                name="individualUrl"
              />
              {formik.touched.individualUrl && formik.errors.individualUrl ? (
                <div className="text-red-500 text-sm">{formik.errors.individualUrl}</div>
              ) : null}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    individualHasContent && formik.isValid && !isLoading
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "bg-gray-500 text-white cursor-not-allowed"
                  }`}
                  disabled={!individualHasContent || !formik.isValid || isLoading}
                >
                  {isLoading ? <><Loader2 className='w-4 h-4 animate-spin'/> Add link</> : "Add link"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {linkSources.length > 0 && (
        <SourcesManager
          items={sourceItems}
          title="Link sources"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteItems={handleDeleteItems}
          onRestore={handleRestore}
          getItemIcon={getItemIcon}
          formatItemDetails={formatItemDetails}
          showRestore={true}
          emptySearchMessage="No links found"
        />
      )}
    </>
  );
};

export default WebsiteTab;