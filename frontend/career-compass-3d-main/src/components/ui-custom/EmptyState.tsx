import React from "react";
import { FolderSearch, ArrowUpRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderSearch,
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div className="saas-card-static p-12 text-center flex flex-col items-center justify-center my-6 border-[#E2E8F0] bg-white">
      <div className="w-16 h-16 rounded-2xl border border-[#635BDB]/20 bg-[#F4F3FF] flex items-center justify-center mb-4 text-[#635BDB] shadow-sm">
        <Icon className="w-8 h-8" />
      </div>

      <h4 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h4>
      <p className="text-sm text-[#475569] max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="glow-cyan-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white"
        >
          <span>{actionText}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="glow-cyan-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white"
        >
          <span>{actionText}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
