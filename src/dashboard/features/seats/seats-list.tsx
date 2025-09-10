"use client";
import { useDashboard } from "./seats-state";
import { ChartHeader } from "@/features/common/chart-header";
import { Card, CardContent } from "@/components/ui/card";
import { stringIsNullOrEmpty } from "@/utils/helpers";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

interface SeatData {
    user: string;
    organization: string | null;
    team: string | null;
    createdAt: string;
    updatedAt: string;
    lastActivityAt: string;
    lastActivityEditor: string;
    planType: string;
    pendingCancellationDate: string;
}

function formatEditorName(editor: string): string {
    if (stringIsNullOrEmpty(editor)) {
        return editor;
    }
    const editorInfo = editor.split('/');
    const editorName = `${editorInfo[0]} (${editorInfo[1]})`;

    return editorName;
}

const arrayIncludes = (row: any, id: string, value: any[]) => {
    return value.includes(row.getValue(id));
};

const stringIncludes = (row: any, id: string, value: string) => {
    return row.getValue(id).includes(value);
};

const columns: ColumnDef<SeatData>[] = [
    { accessorKey: "user", title: "用户", filter: stringIncludes },
    { accessorKey: "organization", title: "组织", filter: arrayIncludes },
    { accessorKey: "team", title: "团队", filter: arrayIncludes },
    { accessorKey: "createdAt", title: "创建日期" },
    { accessorKey: "updatedAt", title: "更新日期" },
    { accessorKey: "lastActivityAt", title: "最后活动日期" },
    { accessorKey: "lastActivityEditor", title: "最后活动编辑器" },
    { accessorKey: "planType", title: "计划类型", filter: arrayIncludes },
    { accessorKey: "pendingCancellationDate", title: "待取消日期" }
].map((col) => ({
    accessorKey: col.accessorKey,
    id: col.accessorKey,
    meta: { name: col.title },
    header: ({ column }) => (
        <DataTableColumnHeader
            column={column}
            title={col.title}
        />
    ),
    cell: ({ row }) => <div className="ml-2">{row.getValue(col.accessorKey)}</div>,
    filterFn: col.filter,
}));

export const SeatsList = () => {
    const { seatsData } = useDashboard();
    const hasOrganization = seatsData?.seats.some((seat) => seat.organization);
    const hasTeam = seatsData?.seats.some((seat) => seat.assigning_team);
    return (
        <Card className="col-span-4">
            <ChartHeader
                title="已分配坐席"
                description=""
            />
            <CardContent>
                <DataTable
                    columns={columns.filter((col) => col.id !== "organization" || hasOrganization)}
                    data={(seatsData?.seats ?? []).map((seat) => ({
                        user: seat.assignee.login,
                        organization: seat.organization?.login,
                        team: seat.assigning_team?.name,
                        createdAt: new Date(seat.created_at).toLocaleDateString(),
                        updatedAt: new Date(seat.updated_at).toLocaleDateString(),
                        lastActivityAt: seat.last_activity_at ? new Date(seat.last_activity_at).toLocaleDateString() : "-",
                        lastActivityEditor: formatEditorName(seat.last_activity_editor),
                        planType: seat.plan_type,
                        pendingCancellationDate: seat.pending_cancellation_date ? new Date(seat.pending_cancellation_date).toLocaleDateString() : "N/A",
                    }))}
                    initialVisibleColumns={{
                        updatedAt: false,
                        planType: false,
                        pendingCancellationDate: false,
                    }}
                    search={{
                        column: "user",
                        placeholder: "过滤坐席...",
                    }}
                    filters={[
                        ...(hasOrganization ? [{ column: "organization", label: "组织" }] : []),
                        ...(hasTeam ? [{ column: "team", label: "团队" }] : []),
                        { column: "planType", label: "计划类型" }
                    ]}
                    enableExport
                />
            </CardContent>
        </Card>
    );
};
