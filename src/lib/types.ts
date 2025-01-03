// src/lib/types.ts
export interface Item {
    id: string;
    tenantId: string;
    name: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
}

export interface CreateItemDto {
    name: string;
}

export interface UpdateItemDto {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
}