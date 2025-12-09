import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Copy, Download, Loader2, Save, History, Trash2, FileText, X, Tag, Filter, Pencil, Check } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedContent {
  id: string;
  title: string;
  content: string;
  content_type: string;
  tone: string;
  tags: string[];
  created_at: string;
}

const ContentGenerator = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog-post");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [generatedContent, setGeneratedContent] = useState("");
  const [savedContents, setSavedContents] = useState<SavedContent[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  // Tags state
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editTagInput, setEditTagInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSavedContent = async () => {
    if (!user) return;
    
    setIsLoadingHistory(true);
    try {
      let query = supabase
        .from("saved_content")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (filterTag) {
        query = query.contains("tags", [filterTag]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSavedContents(data || []);
      
      // Extract all unique tags
      const tags = new Set<string>();
      data?.forEach((content) => {
        content.tags?.forEach((tag: string) => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
    } catch (error: any) {
      console.error("Error fetching saved content:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (user && isHistoryOpen) {
      fetchSavedContent();
    }
  }, [user, isHistoryOpen, filterTag]);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !currentTags.includes(tag)) {
      setCurrentTags([...currentTags, tag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentTags(currentTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Edit functions
  const startEditing = (content: SavedContent) => {
    setEditingId(content.id);
    setEditTitle(content.title);
    setEditTags(content.tags || []);
    setEditTagInput("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditTags([]);
    setEditTagInput("");
  };

  const handleAddEditTag = () => {
    const tag = editTagInput.trim().toLowerCase();
    if (tag && !editTags.includes(tag)) {
      setEditTags([...editTags, tag]);
      setEditTagInput("");
    }
  };

  const handleRemoveEditTag = (tagToRemove: string) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove));
  };

  const handleEditTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEditTag();
    }
  };

  const saveEdit = async () => {
    if (!editingId || !editTitle.trim()) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("saved_content")
        .update({ title: editTitle, tags: editTags })
        .eq("id", editingId);

      if (error) throw error;

      setSavedContents((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, title: editTitle, tags: editTags } : c
        )
      );

      // Update allTags
      const tags = new Set<string>();
      savedContents.forEach((content) => {
        if (content.id === editingId) {
          editTags.forEach((tag) => tags.add(tag));
        } else {
          content.tags?.forEach((tag) => tags.add(tag));
        }
      });
      setAllTags(Array.from(tags).sort());

      toast({
        title: "Content updated",
        description: "Title and tags have been saved.",
      });
      cancelEditing();
    } catch (error: any) {
      console.error("Update error:", error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update content.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedContent("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { type: contentType, topic, tone, length },
      });

      if (error) throw error;

      if (data?.content) {
        setGeneratedContent(data.content);
        toast({
          title: "Content generated!",
          description: "Your AI-powered content is ready.",
        });
      } else {
        throw new Error("No content received");
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to save content.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!generatedContent.trim()) {
      toast({
        title: "No content to save",
        description: "Generate content first before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from("saved_content").insert({
        user_id: user.id,
        title: topic,
        content: generatedContent,
        content_type: contentType,
        tone: tone,
        tags: currentTags,
      });

      if (error) throw error;

      toast({
        title: "Content saved!",
        description: "Your content has been saved to your history.",
      });
      setCurrentTags([]);
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        title: "Save failed",
        description: error.message || "Failed to save content.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadContent = (content: SavedContent) => {
    setTopic(content.title);
    setGeneratedContent(content.content);
    setContentType(content.content_type);
    setTone(content.tone || "professional");
    setCurrentTags(content.tags || []);
    setIsHistoryOpen(false);
    toast({
      title: "Content loaded",
      description: "Previously saved content has been loaded.",
    });
  };

  const handleDeleteContent = async (id: string) => {
    try {
      const { error } = await supabase.from("saved_content").delete().eq("id", id);

      if (error) throw error;

      setSavedContents((prev) => prev.filter((c) => c.id !== id));
      toast({
        title: "Content deleted",
        description: "The saved content has been removed.",
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete content.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contentType}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const contentTypeLabels: Record<string, string> = {
    "blog-post": "Blog Post",
    "marketing-copy": "Marketing Copy",
    "social-media": "Social Media",
    "email": "Email",
  };

  return (
    <PageLayout title="AI Content Generator">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Powered by AI</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI Content Generator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Generate high-quality blog posts, marketing copy, and more with the power of AI.
              </p>
              
              {user && (
                <Dialog open={isHistoryOpen} onOpenChange={(open) => {
                  setIsHistoryOpen(open);
                  if (!open) cancelEditing();
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                      <History className="mr-2 h-4 w-4" />
                      View Saved Content
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Saved Content</DialogTitle>
                      <DialogDescription>
                        Your previously saved AI-generated content
                      </DialogDescription>
                    </DialogHeader>
                    
                    {/* Tag filter */}
                    {allTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pb-2 border-b">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Button
                          variant={filterTag === null ? "secondary" : "ghost"}
                          size="sm"
                          onClick={() => setFilterTag(null)}
                        >
                          All
                        </Button>
                        {allTags.map((tag) => (
                          <Button
                            key={tag}
                            variant={filterTag === tag ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setFilterTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <ScrollArea className="h-[400px] pr-4">
                      {isLoadingHistory ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : savedContents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>{filterTag ? `No content with tag "${filterTag}"` : "No saved content yet"}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {savedContents.map((content) => (
                            <Card key={content.id} className="p-4">
                              {editingId === content.id ? (
                                // Edit mode
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <Label htmlFor={`edit-title-${content.id}`}>Title</Label>
                                    <Input
                                      id={`edit-title-${content.id}`}
                                      value={editTitle}
                                      onChange={(e) => setEditTitle(e.target.value)}
                                      placeholder="Content title"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="Add a tag..."
                                        value={editTagInput}
                                        onChange={(e) => setEditTagInput(e.target.value)}
                                        onKeyDown={handleEditTagKeyDown}
                                      />
                                      <Button type="button" variant="outline" size="sm" onClick={handleAddEditTag}>
                                        Add
                                      </Button>
                                    </div>
                                    {editTags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {editTags.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="gap-1">
                                            {tag}
                                            <button
                                              type="button"
                                              onClick={() => handleRemoveEditTag(tag)}
                                              className="ml-1 hover:text-destructive"
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2 justify-end">
                                    <Button variant="ghost" size="sm" onClick={cancelEditing}>
                                      Cancel
                                    </Button>
                                    <Button size="sm" onClick={saveEdit} disabled={isUpdating}>
                                      {isUpdating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <>
                                          <Check className="mr-1 h-4 w-4" />
                                          Save
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                // View mode
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate">{content.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                      <span className="capitalize">{contentTypeLabels[content.content_type] || content.content_type}</span>
                                      <span>•</span>
                                      <span>{format(new Date(content.created_at), "MMM d, yyyy")}</span>
                                    </div>
                                    {content.tags && content.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {content.tags.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                      {content.content.slice(0, 150)}...
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => startEditing(content)}
                                      title="Edit"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleLoadContent(content)}
                                    >
                                      Load
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDeleteContent(content.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Card>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Content Settings</CardTitle>
                  <CardDescription>
                    Configure your content preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic or Subject</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Benefits of remote work for startups"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger id="content-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog-post">Blog Post</SelectItem>
                        <SelectItem value="marketing-copy">Marketing Copy</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger id="tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Length</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger id="length">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (150-300 words)</SelectItem>
                        <SelectItem value="medium">Medium (400-600 words)</SelectItem>
                        <SelectItem value="long">Long (800-1200 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags input */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">
                      <Tag className="h-3 w-3 inline mr-1" />
                      Tags (optional)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                      />
                      <Button type="button" variant="outline" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>
                    {currentTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {currentTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Content</CardTitle>
                      <CardDescription>
                        Your AI-generated content appears here
                      </CardDescription>
                    </div>
                    {generatedContent && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleSave}
                          disabled={isSaving}
                          title="Save to history"
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleCopy} title="Copy">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleDownload} title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <Textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="min-h-[400px] font-mono text-sm"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                      <p className="text-center">
                        Enter a topic and click Generate to create your content
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContentGenerator;
